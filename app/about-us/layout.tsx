export const metadata = {
  title: "AboutUs",
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      &copy; Next Js is great!
    </div>
  );
}
