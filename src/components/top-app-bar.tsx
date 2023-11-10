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
        height: "4rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>ChessPuzzle</h1>
    </header>
  );
}
