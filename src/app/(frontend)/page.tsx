{/* Collection Section */}
        <section className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-light text-black">Collection</h2>
            <div className="h-px w-16 bg-black mx-auto"></div>
          </div>

          {apparel.docs.length === 0 ? (
            <div className="text-center py-20">
              <div className="space-y-4">
                <p className="text-gray-600 text-xl">New arrivals coming soon</p>
              </div>
            </div>
          ) : (
            <div className="relative">
              {/* Shelf Container */}
              <div className="bg-gray-50 border border-gray-200 p-8 overflow-x-auto">
                <div className="flex gap-8 min-w-max pb-4">
                  {apparel.docs.map((item: any, index: number) => (
                    <Dialog key={item.id}>
                      <DialogTrigger asChild>
                        <div className="group cursor-pointer flex-shrink-0">
                          <div className="relative w-64 h-80 overflow-hidden bg-white border border-gray-200 shadow-sm">
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
                                className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                              />
                            )}
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

                      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white border border-gray-200">
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

              {/* Shelf Base */}
              <div className="h-2 bg-gray-800 border-t border-gray-600"></div>
            </div>
          )}
        </section>