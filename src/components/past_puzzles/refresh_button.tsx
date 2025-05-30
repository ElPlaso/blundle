import { useCallback } from "react";
import { useNavigate } from "react-router";

export default function RefreshButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const navigate = useNavigate();

  const handleRefresh = useCallback(() => {
    navigate(0);
  }, [navigate]);

  return (
    <button className={className} onClick={handleRefresh}>
      {children}
    </button>
  );
}
