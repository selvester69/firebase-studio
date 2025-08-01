
"use client";

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { fetchProducts } from '@/services/dashboardService';
import type { Product } from '@/lib/placeholder-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PackageSearch, Star, Search as SearchIcon, ShoppingBag } from 'lucide-react'; // Added ShoppingBag
import { ScrollArea } from '@/components/ui/scroll-area';

interface GroupedProducts {
  [category: string]: Product[];
}

export default function InventoryManagementPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeAccordionItems, setActiveAccordionItems] = useState<string[]>([]);

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        // Optionally open all categories by default or the first one
        if (fetchedProducts.length > 0) {
          const categories = Array.from(new Set(fetchedProducts.map(p => p.category)));
          setActiveAccordionItems(categories); // Open all by default
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  const filteredAndGroupedProducts = useMemo(() => {
    const filtered = products.filter(product =>
      (product.name ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.brand ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category ?? '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as GroupedProducts);
  }, [products, searchTerm]);

  const categories = Object.keys(filteredAndGroupedProducts);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
        <PackageSearch className="h-12 w-12 animate-pulse text-primary" />
        <p className="ml-4 text-xl">Loading inventory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center font-headline text-2xl">
            <ShoppingBag className="mr-2 h-6 w-6" /> Inventory Management
          </CardTitle>
          <CardDescription>Browse, search, and manage product inventory.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex items-center gap-2">
            <SearchIcon className="h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products by name, brand, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
        </CardContent>
      </Card>

      {categories.length === 0 && !isLoading && (
        <Card>
          <CardContent className="p-10 text-center">
            <PackageSearch className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl font-semibold">No products found</p>
            <p className="text-muted-foreground">
              {searchTerm ? "Try adjusting your search terms." : "There are no products in the inventory."}
            </p>
          </CardContent>
        </Card>
      )}

      {categories.length > 0 && (
        <ScrollArea className="h-[calc(100vh-22rem)] pr-2"> {/* Adjusted height */}
          <Accordion 
            type="multiple" 
            value={activeAccordionItems}
            onValueChange={setActiveAccordionItems}
            className="w-full space-y-2"
          >
            {categories.map((category) => (
              <AccordionItem value={category} key={category} className="border bg-card rounded-lg shadow-sm">
                <AccordionTrigger className="px-4 py-3 text-lg font-medium hover:no-underline">
                  {category} ({filteredAndGroupedProducts[category].length})
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredAndGroupedProducts[category].map((product) => (
                      <Card key={product.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-md">
                        <CardHeader className="p-0 relative aspect-square">
                          <Image
                            src={product.imageUrl}
                            alt={product.name ?? `${product.brand ?? ''} ${product.category ?? 'Product'}`}
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint={`${product.category ?? ''} ${product.brand ?? ''}`}
                          />
                        </CardHeader>
                        <CardContent className="p-4 flex-grow">
                          <CardTitle className="text-base font-semibold mb-1 line-clamp-2">{product.name}</CardTitle>
                          <CardDescription className="text-xs text-muted-foreground mb-2">{product.brand}</CardDescription>
                          
                          <div className="flex items-center justify-between text-sm mb-2">
                            <Badge variant="secondary">In Stock: {product.stock}</Badge>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                              <span>{product.rating.toFixed(1)}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                           <p className="text-lg font-semibold text-primary w-full text-right">${product.price.toFixed(2)}</p>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      )}
    </div>
  );
}
