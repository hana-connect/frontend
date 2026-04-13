"use client";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/common/components/alert-dialog/AlertDialog";

type AlertRenderApi = {
  close: () => void;
  isActing: boolean;
};

interface AlertOptions {
  title?: string;
  description?: string;
  actionLabel?: string;
  cancelLabel?: string;
  onAction?: () => void | Promise<void>;
  content?: ReactNode;
  footer?: ReactNode | ((api: AlertRenderApi) => ReactNode);
  render?: ReactNode | ((api: AlertRenderApi) => ReactNode);
  closeOnAction?: boolean;
  contentClassName?: string;
  actionProps?: Omit<
    React.ComponentProps<typeof AlertDialogAction>,
    "onClick" | "disabled"
  >;
  cancelProps?: Omit<
    React.ComponentProps<typeof AlertDialogCancel>,
    "disabled"
  >;
}

interface AlertDialogContextType {
  alert: (options: AlertOptions) => void;
  close: () => void;
}

const AlertDialogContext = createContext<AlertDialogContextType | undefined>(
  undefined,
);

export function AlertDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AlertOptions>({});
  const [isActing, setIsActing] = useState(false);
  const actingRef = useRef(false);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) {
      actingRef.current = false;
      setIsActing(false);
    }
  }, [isOpen]);

  const api = useMemo(() => ({ close, isActing }), [close, isActing]);

  const alert = useCallback((newOptions: AlertOptions) => {
    actingRef.current = false;
    setIsActing(false);
    setOptions(newOptions);
    setIsOpen(true);
  }, []);

  const handleAction = useCallback(async () => {
    if (actingRef.current) return;

    actingRef.current = true;
    setIsActing(true);

    try {
      await options.onAction?.();

      if (options.closeOnAction !== false) {
        close();
        return;
      }
    } catch (error) {
      console.error("Alert Action Error:", error);
    } finally {
      actingRef.current = false;
      setIsActing(false);
    }
  }, [close, options]);

  const renderFooter = () => {
    if (options.footer) {
      return typeof options.footer === "function"
        ? options.footer(api)
        : options.footer;
    }

    const showCancel = !!options.cancelLabel;

    return (
      <AlertDialogFooter>
        {showCancel && (
          <AlertDialogCancel {...options.cancelProps} disabled={isActing}>
            {options.cancelLabel}
          </AlertDialogCancel>
        )}
        <AlertDialogAction
          {...options.actionProps}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            handleAction();
          }}
          disabled={isActing}
        >
          {options.actionLabel || "확인"}
        </AlertDialogAction>
      </AlertDialogFooter>
    );
  };

  return (
    <AlertDialogContext.Provider value={{ alert, close }}>
      {children}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className={options.contentClassName}>
          <VisuallyHidden.Root>
            <AlertDialogTitle>{options.title || "알림"}</AlertDialogTitle>
            <AlertDialogDescription>
              {options.description || "대화상자"}
            </AlertDialogDescription>
          </VisuallyHidden.Root>

          {options.render ? (
            typeof options.render === "function" ? (
              options.render(api)
            ) : (
              options.render
            )
          ) : (
            <>
              <AlertDialogHeader>
                {options.title && (
                  <AlertDialogTitle>{options.title}</AlertDialogTitle>
                )}
                {options.description && (
                  <AlertDialogDescription>
                    {options.description}
                  </AlertDialogDescription>
                )}
                {options.content && (
                  <div className="mt-2 w-full">{options.content}</div>
                )}
              </AlertDialogHeader>
              {renderFooter()}
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </AlertDialogContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertDialogContext);
  if (!context)
    throw new Error("useAlert must be used within an AlertDialogProvider");
  return context;
}
