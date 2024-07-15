import MyNavbar from "@/components/MyNavbar";

export default function HomeLayout({ children }) {
  return (
    <div>
      <MyNavbar />
      <main>
        {children}
      </main>

    </div>
  );
}
