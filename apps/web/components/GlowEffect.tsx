export const GlowEffect = () => {
    return (
        <>
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-indigo-600/5" />
        <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-500/20 rounded-full blur-3xl" />
        </div>
        </>
    )
}