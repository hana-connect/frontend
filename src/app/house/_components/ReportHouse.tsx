import Image from "next/image";
import type { Season } from "../_constants/level";
import { getHouseAssets } from "../_lib/getHouseAssets";

interface ReportHouseProps {
  level: number;
  season: Season;
}

function ReportHouse({ level, season }: ReportHouseProps) {
  const { ground, objects } = getHouseAssets(level, season);

  return (
    <div className="flex justify-center items-center my-8">
      <div className="relative">
        <Image
          src={`/svg/house/${ground}.svg`}
          alt={ground}
          width={375}
          height={293}
          className="object-contain mx-[-24px]"
        />

        {objects.map((asset) => (
          <img
            key={asset.name}
            src={`/svg/house/${asset.name}.svg`}
            alt={asset.name}
            style={{
              position: "absolute",
              left: asset.x,
              top: asset.y,
              width: asset.width,
              height: asset.height,
            }}
          />
        ))}

        {level === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-grey-3 text-body-16-m">
            텅
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportHouse;
