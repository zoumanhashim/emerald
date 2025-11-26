{/* Collection Section */}
        <section id="collection" className="py-12 md:py-16" style={{
          backgroundImage: `url('/sky_with_a_bridge__tgs13qdcdyk9msx8rhof_0.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}>
          <div className="w-full max-w-7xl mx-auto px-4">
            {products.docs.length === 0 ? (
              <div className="text-center py-20 bg-black/20 border-2 border-stone-900 p-8">
                <h2 className="text-2xl">No products available...</h2>
                <p className="mt-4 text-stone-300">New items will be available soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                {products.docs.map((item: any) => (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <div className="group cursor-pointer text-center">
                        <div className="bg-black/20 p-2 aspect-square flex items-center justify-center transition-colors duration-200 hover:bg-black/30">
                          <div className="relative w-full h-full">
                            {((item.image && typeof item.image === 'object') ||
                              item.imageUrl) && (
                              <Image
                                src={
                                  item.image && typeof item.image === 'object'
                                    ? item.image.url
                                    : item.imageUrl
                                }
                                alt={
                                  (item.image && typeof item.image === 'object'
                                    ? item.image.alt
                                    : undefined) || item.name
                                }
                                fill
                                className="object-contain"
                                style={{ imageRendering: 'pixelated' }}
                              />
                            )}
                          </div>
                        </div>
                        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <p className="text-sm text-white bg-black/70 px-2 py-1 inline-block">
                            {item.name}
                          </p>
                          <p className="text-xs text-yellow-300 bg-black/70 px-2 py-1 inline-block">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </DialogTrigger>