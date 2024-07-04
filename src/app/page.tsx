import Sidebar from "@/components/sidebar";
import Image from "next/image";
import WelcomeImage from "../../public/images/welcome.svg";

export default function Home() {
  return (
    <main>
      <Sidebar />
      <div className="flex justify-center items-center h-screen p-6 sm:ml-64 bg-slate-100">
        <Image src={WelcomeImage} alt="welcome-image" width={500} height={500} />
      </div>
    </main>
  );
}
