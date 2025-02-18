interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="max-w-[1800px] mx-auto px-12 sm:px-16 lg:px-24">
      {children}
    </div>
  )
} 
