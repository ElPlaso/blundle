import StatsModal from "./stats-modal";

export default function TopAppBar() {
  return (
    <header
      style={{
        position: "sticky",
        width: "100%",
        top: 0,
        backgroundColor: "#213547",
        color: "white",
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
        zIndex: 1,
        maxHeight: "4rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
      }}
    >
      <span style={{ flex: 1 }}></span>
      <h1 style={{ flex: 1 }}>ChessPuzzle</h1>
      <div style={{ flex: 1 }}>
        <StatsModal />
      </div>
    </header>
  );
}
