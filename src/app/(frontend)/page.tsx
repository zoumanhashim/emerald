import React from 'react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="w-full max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="text-xl font-bold text-secondary hover:text-secondary/90 transition-colors">
            Panjshir Valley
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <button className="text-sm font-light text-gray-600">Sign In</button>
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
                Register
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-20">
        <section className="py-24 md:py-32 text-center bg-muted/50 border-b border-border">
          <div className="w-full max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-secondary">The Emerald Bridge</h1>
            <p className="mt-6 text-lg text-foreground/80 max-w-2xl mx-auto">
              Connecting the historic Panjshir Valley to the world.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}