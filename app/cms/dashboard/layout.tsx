import Footer from "@/app/ui/components/sections/Footer";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className='h-full'>
          <div className="h-full">{children}</div>
        </div>
    );
  }