export function Hero() {
    return (
        <section className="relative py-20 sm:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                        Discover Amazing Events
                    </h1>
                    <p className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
                        Register for workshops, conferences, and programs that match your interests. Find your next learning opportunity today.
                    </p>
                    <div className="mt-10 flex justify-center gap-4">
                        <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                            Explore Events
                        </button>
                        <button className="px-8 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
