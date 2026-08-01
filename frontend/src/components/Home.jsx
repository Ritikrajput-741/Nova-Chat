import MessageContainer from "./message/MessageContainer";
import Sidebar from "./sidebar/Sidebar";

const Home = () => {
  return (
    <div className="h-screen bg-slate-950 p-2 md:p-4">
      {/* Background Blur */}
      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <Sidebar />

        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
