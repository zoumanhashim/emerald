{/* Collection Section */}
        <section id="collection" className="space-y-16 py-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-light text-black">Collection</h2>
            <div className="h-px w-16 bg-black mx-auto"></div>
          </div>

          {snacks.docs.length === 0 ? (
            <div className="text-center py-20">
              <div className="space-y-4">
                <p className="text-gray-600 text-xl">New arrivals coming soon</p>
              </div>
            </div>
          ) : (
            <div className="relative">
              {/* Shelf Container */}
              <div className="bg-gradient-to-b from-gray-50 to-gray-100 border border-gray-300 p-8 overflow-x-auto shadow-inner">
                <div className="flex gap-6 min-w-max pb-6">
                  {snacks.docs.map((item: any, index: number) => (
                    <Dialog key={item.id}>
                      <DialogTrigger asChild>
                        <div className="group cursor-pointer flex-shrink-0 transform transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                          <div className="relative w-64 h-80 overflow-hidden bg-white border border-gray-200 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                            {((item.image && typeof item.image === 'object') || item.imageUrl) && (
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
                                className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
                              />
                            )}
                            {/* Subtle overlay on hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                          </div>
                          <div className="mt-4 space-y-2 text-center">
                            <h3 className="text-sm font-light text-black group-hover:text-gray-600 transition-colors duration-300">
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-500 font-light uppercase tracking-wider">{item.category}</p>
                            <p className="text-sm font-medium text-black">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      </DialogTrigger>

                      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white border border-gray-200 shadow-2xl">
                        <DialogHeader className="sr-only">
                          <DialogTitle>{item.name}</DialogTitle>
                          <DialogDescription>{item.description}</DialogDescription>
                        </DialogHeader>
                        <div className="grid md:grid-cols-2">
                          {/* Product Image */}
                          <div className="relative aspect-[3/4] bg-gray-50">
                            {((item.image && typeof item.image === 'object') || item.imageUrl) && (
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
                                className="object-cover"
                              />
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="p-12 space-y-8">
                            <div className="space-y-4">
                              <h2 className="text-3xl font-light text-black">{item.name}</h2>
                              <div className="h-px w-12 bg-black"></div>
                              <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </div>

                            <div className="space-y-2">
                              <p className="text-2xl font-medium text-black">${item.price.toFixed(2)}</p>
                              <p className="text-sm text-gray-500 uppercase tracking-wider">{item.category}</p>
                            </div>

                            <div className="pt-8">
                              {user ? (
                                <AddToCartButton snack={item} />
                              ) : (
                                <Button
                                  asChild
                                  className="w-full bg-black hover:bg-gray-800 text-white border-0 py-4 text-sm font-light tracking-wider"
                                >
                                  <Link href="/login">SIGN IN TO PURCHASE</Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </div>

              {/* Enhanced Shelf Base with depth */}
              <div className="relative">
                <div className="h-3 bg-gradient-to-b from-gray-800 to-gray-900 border-t border-gray-700 shadow-lg"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600 transform translate-y-full"></div>
              </div>
            </div>
          )}
        </section>