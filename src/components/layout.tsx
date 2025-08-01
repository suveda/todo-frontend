"use client";
import Logo from "./logo";

interface LayoutProps {
  children: React.ReactNode;
  showCreateButton?: boolean;
  onCreateClick?: () => void;
  createButtonContent?: React.ReactNode;
}

export default function Layout({ 
  children, 
  showCreateButton = false, 
  onCreateClick, 
  createButtonContent 
}: LayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="bg-[#0D0D0D] w-full h-[180px] relative pb-6">
        <div className="w-full flex justify-center py-10">
          <Logo />
        </div>
        
        {showCreateButton && (
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-20">
            <div className="w-[736px]">
              <button
                className="w-full h-[52px] bg-[#1E6F9F] text-white font-semibold rounded-lg flex items-center justify-center gap-1 shadow-lg hover:bg-[#155a7a] transition-colors"
                type="button"
                onClick={onCreateClick}
              >
                {createButtonContent}
              </button>
            </div>
          </div>
        )}
      </header>
      
      <main className={`bg-[#1A1A1A] min-h-[calc(100vh-140px)] text-white ${showCreateButton ? 'pt-6' : 'pt-6'}`}>
        {children}
      </main>
    </div>
  );
}
