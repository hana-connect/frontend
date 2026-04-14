import Image from "next/image";
import type { Season } from "../_constants/level";
import { getHouseAssets } from "../_lib/getHouseAssets";

type ReportHouseProps = {
  level: number;
  season: Season;
};

function ReportHouse({ level, season }: ReportHouseProps) {
  const { ground, objects } = getHouseAssets(level, season);

  return (
    <div className="flex justify-center items-center my-8">
      <div className="relative w-[375px] h-[293px] mx-[-24px]">
        {level > 0 ? (
          <>
            <Image
              src={`/svg/house/${ground}.svg`}
              alt={ground}
              fill
              className="object-contain"
              priority
            />

            {objects.map((asset) => (
              <div
                key={asset.name}
                style={{
                  position: "absolute",
                  left: asset.x,
                  top: asset.y,
                  width: asset.width,
                  height: asset.height,
                }}
              >
                <Image
                  src={`/svg/house/${asset.name}.svg`}
                  alt={asset.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </>
        ) : (
          <Image
            src="/svg/house/ic_house_0.svg"
            alt="ic_house_0"
            fill
            className="object-contain"
            priority
          />
        )}
      </div>
    </div>
  );
}

export default ReportHouse;
