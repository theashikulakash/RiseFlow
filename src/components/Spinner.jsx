const Spinner = ({ full }) => (
  <div className={full ? "min-h-screen flex items-center justify-center" : "flex items-center justify-center py-10"}>
    <div className="h-8 w-8 border-2 border-teal/20 border-t-teal rounded-full animate-spin" />
  </div>
);

export default Spinner;
