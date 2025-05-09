export default function MainPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen w-full flex flex-col bg-amber-300">
            {children}
        </div>
    );
}