"use client"

import { useState } from 'react'
import { Search, ShoppingCart, ChevronDown, MessageCircle } from 'lucide-react'

export default function VolimLjuto() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top green bar */}
      <div className="bg-green-600 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <span className="font-bold">BESPLATNA DOSTAVA ZA NARUDŽBE IZNAD 25,90€ U HR.!</span>
          </div>
          <div className="flex space-x-4 text-sm">
            <a href="#" className="hover:underline flex items-center">
              Blog <ChevronDown className="h-4 w-4 ml-1" />
            </a>
            <a href="#" className="hover:underline">Prodajna mjesta</a>
            <a href="#" className="hover:underline flex items-center">
              Veleprodaja <ChevronDown className="h-4 w-4 ml-1" />
            </a>
            <a href="#" className="hover:underline flex items-center">
              O nama <ChevronDown className="h-4 w-4 ml-1" />
            </a>
            <a href="#" className="hover:underline flex items-center">
              Pomoć <ChevronDown className="h-4 w-4 ml-1" />
            </a>
            <a href="#" className="hover:underline">Kontakt</a>
            <a href="#" className="hover:underline relative">
              Lista želja
              <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                0
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Logo and search bar */}
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="w-40">
          <a href="#">
            <img 
              src="/placeholder.svg?height=80&width=160" 
              alt="Volim Ljuto Logo" 
              className="h-20"
            />
          </a>
        </div>
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Upišite pretragu..."
              className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="border border-gray-300 rounded px-4 py-2 hover:bg-gray-100">
            PRIJAVA
          </a>
          <a href="#" className="flex items-center hover:text-green-600">
            <span>KOŠARICA / 0,00 €</span>
            <ShoppingCart className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-green-600 text-white">
        <div className="container mx-auto">
          <ul className="flex">
            <li className="relative group">
              <a href="#" className="block px-4 py-3 hover:bg-green-700 font-medium">LJUTI UMACI</a>
            </li>
            <li className="relative group">
              <a href="#" className="block px-4 py-3 hover:bg-green-700 font-medium">CHILI PAPRIČICE</a>
            </li>
            <li className="relative group">
              <a href="#" className="block px-4 py-3 hover:bg-green-700 font-medium">BBQ</a>
            </li>
            <li className="relative group">
              <a href="#" className="block px-4 py-3 hover:bg-green-700 font-medium">POKLON PAKETI</a>
            </li>
            <li className="relative group">
              <a href="#" className="block px-4 py-3 hover:bg-green-700 font-medium">ZIMNICA</a>
            </li>
            <li className="relative group">
              <a href="#" className="block px-4 py-3 hover:bg-green-700 font-medium">GRICKALICE</a>
            </li>
            <li className="relative group">
              <a href="#" className="block px-4 py-3 hover:bg-green-700 font-medium">OSTALO</a>
            </li>
            <li className="relative group">
              <a href="#" className="block px-4 py-3 hover:bg-green-700 font-medium">FERMENT LAB</a>
            </li>
            <li className="relative group">
              <a href="#" className="block px-4 py-3 hover:bg-green-700 font-medium">NOVO</a>
            </li>
            <li className="relative group">
              <a href="#" className="block px-4 py-3 hover:bg-green-700 font-medium">AKCIJA</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Hero section with hot sauce bottles background */}
      <div className="relative bg-cover bg-center py-16" style={{ backgroundImage: "url('/placeholder.svg?height=400&width=1200')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <h1 className="text-5xl font-bold mb-6">LJUTI UMACI</h1>
          <p className="text-xl max-w-4xl mx-auto">
            Naši ljuti umaci proizvode se fermentacijom ili kuhanjem. Ljutina umaka je označena brojem zvjezdica na samom
            proizvodu i kreće se od 1 za blago ljuto do 5 za ultra ljuto. Uz to postoje i ljuće varijante koje su označene ljutinama 6/5 ili
            7/5, kao i ekstremno ljuti umaci u bočicama s pipetama, no s njima budite pažljivi.
          </p>
        </div>
      </div>

      {/* Product listing section */}
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <a href="#" className="hover:text-green-600">POČETNA</a>
          <span className="mx-2">/</span>
          <span className="font-medium">LJUTI UMACI</span>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-gray-600">Prikazujemo 1–12 od 60 rezultata</p>
          </div>
          <div>
            <select className="border border-gray-300 rounded-md py-2 px-4">
              <option>Razvrstaj po popularnosti</option>
              <option>Razvrstaj po cijeni: manje do veće</option>
              <option>Razvrstaj po cijeni: veće do manje</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Sidebar categories */}
          <div className="w-full md:w-1/4 pr-0 md:pr-8 mb-8 md:mb-0">
            <h3 className="text-lg font-medium mb-4">KATEGORIJE PROIZVODA</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex justify-between text-green-600 hover:text-green-700">
                  Ferment Lab <span className="text-gray-500">(2)</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex justify-between font-medium hover:text-green-600">
                  Ljuti umaci <span className="text-gray-500">(60)</span>
                </a>
                <ul className="pl-4 mt-2 space-y-2">
                  <li>
                    <a href="#" className="text-green-600 hover:text-green-700">Fermentirani ljuti umaci</a>
                  </li>
                  <li>
                    <a href="#" className="text-green-600 hover:text-green-700">Kuhani ljuti umaci</a>
                  </li>
                  <li>
                    <a href="#" className="text-green-600 hover:text-green-700">Big One ljuti umaci 500ml</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" className="flex justify-between text-green-600 hover:text-green-700">
                  BBQ (roštilj) dodaci i umaci <span className="text-gray-500">(32)</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex justify-between text-green-600 hover:text-green-700">
                  Ljute grickalice <span className="text-gray-500">(8)</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex justify-between text-green-600 hover:text-green-700">
                  Poklon paketi <span className="text-gray-500">(28)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Main content - products */}
          <div className="w-full md:w-3/4">
            {/* Spicy Days banner */}
            <div className="bg-green-600 text-white p-6 mb-8 rounded-lg">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <h3 className="text-2xl font-bold mb-2">NE MOŽEŠ PRONAĆI UMAK KOJI TRAŽIŠ?</h3>
                  <p>Provjeri i ponudu naše trgovine Spicy Days u kojoj imamo poznate svjetske brendove!</p>
                </div>
                <div>
                  <img 
                    src="/placeholder.svg?height=80&width=160" 
                    alt="Spicy Days Logo" 
                    className="h-16"
                  />
                </div>
              </div>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Product 1 */}
              <div className="border rounded-lg overflow-hidden relative group">
                <div className="absolute top-0 right-0 bg-red-600 text-white py-1 px-3 z-10 rotate-45 origin-top-right translate-x-2 -translate-y-2">
                  Hot 10/5
                </div>
                <a href="#">
                  <img 
                    src="/placeholder.svg?height=300&width=300" 
                    alt="Hot Sauce Product" 
                    className="w-full h-64 object-cover"
                  />
                </a>
                <div className="p-4">
                  <h3 className="font-medium">The Reaper Hot Sauce</h3>
                  <p className="text-gray-600 text-sm">20ml</p>
                  <div className="mt-2">
                    <span className="text-red-600 font-bold">19.99 €</span>
                  </div>
                </div>
              </div>

              {/* Product 2 */}
              <div className="border rounded-lg overflow-hidden relative group">
                <div className="absolute top-0 right-0 bg-red-600 text-white py-1 px-3 z-10 rotate-45 origin-top-right translate-x-2 -translate-y-2">
                  Hot 7/5
                </div>
                <a href="#">
                  <img 
                    src="/placeholder.svg?height=300&width=300" 
                    alt="Hot Sauce Product" 
                    className="w-full h-64 object-cover"
                  />
                </a>
                <div className="p-4">
                  <h3 className="font-medium">The Blood Hot Sauce</h3>
                  <p className="text-gray-600 text-sm">30ml</p>
                  <div className="mt-2">
                    <span className="text-red-600 font-bold">24.99 €</span>
                  </div>
                </div>
              </div>

              {/* Product 3 */}
              <div className="border rounded-lg overflow-hidden relative group">
                <div className="absolute top-0 right-0 bg-red-600 text-white py-1 px-3 z-10 rotate-45 origin-top-right translate-x-2 -translate-y-2">
                  Hot 2/5
                </div>
                <a href="#">
                  <img 
                    src="/placeholder.svg?height=300&width=300" 
                    alt="Hot Sauce Product" 
                    className="w-full h-64 object-cover"
                  />
                </a>
                <div className="p-4">
                  <h3 className="font-medium">Vrabasco Hot Sauce</h3>
                  <p className="text-gray-600 text-sm">100ml</p>
                  <div className="mt-2">
                    <span className="text-red-600 font-bold">12.99 €</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
