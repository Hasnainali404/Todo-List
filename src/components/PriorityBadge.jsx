const styles = {
  Low: "bg-green-500/10 text-green-400",
  Medium: "bg-yellow-500/10 text-yellow-400",
  High: "bg-red-500/10 text-red-400",
};

export default function PriorityBadge({ level }) {
  if (!level) return null;

  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${styles[level]}`}
    >
      {level}
    </span>
  );
}
