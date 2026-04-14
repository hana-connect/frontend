type ReportCardProps = {
  label: string;
  value: number;
  unit: string;
};

function ReportCard({ label, value, unit }: ReportCardProps) {
  return (
    <article className="bg-brand-purple-3 p-3 rounded-2xl">
      <p className="text-title-20-sb">{label}</p>
      <p className="text-title-32-sb">
        <span className="text-heading-48-b text-brand-purple-1">{value}</span>
        {unit}
      </p>
    </article>
  );
}

export default ReportCard;
