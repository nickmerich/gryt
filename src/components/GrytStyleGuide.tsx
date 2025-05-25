
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import GrytLogo from './GrytLogo';
import GrytWordmark from './GrytWordmark';
import GrytLogoFull from './GrytLogoFull';

const GrytStyleGuide = () => {
  const colorPalette = [
    { name: 'Primary Purple', hex: '#9333EA', rgb: 'rgb(147, 51, 234)' },
    { name: 'Primary Indigo', hex: '#4F46E5', rgb: 'rgb(79, 70, 229)' },
    { name: 'Primary Blue', hex: '#2563EB', rgb: 'rgb(37, 99, 235)' },
    { name: 'Black', hex: '#000000', rgb: 'rgb(0, 0, 0)' },
    { name: 'White', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)' }
  ];

  const gradients = [
    {
      name: 'Primary Gradient',
      css: 'linear-gradient(135deg, #9333EA 0%, #4F46E5 50%, #2563EB 100%)',
      description: 'Main brand gradient for logos and primary elements'
    },
    {
      name: 'Text Gradient',
      css: 'linear-gradient(90deg, #9333EA 0%, #4F46E5 50%, #2563EB 100%)',
      description: 'Horizontal gradient for text elements'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-black">Gryt Logo Style Guide</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Complete brand guidelines for the Gryt logo system, inspired by running and momentum.
        </p>
      </div>

      {/* Logo Variations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-black">Logo Variations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Full Color */}
            <div className="text-center space-y-4">
              <h3 className="font-semibold text-black">Full Color</h3>
              <div className="flex flex-col items-center space-y-4">
                <GrytLogo size="lg" variant="full-color" />
                <GrytWordmark size="md" variant="full-color" />
                <GrytLogoFull size="sm" variant="full-color" />
              </div>
            </div>

            {/* Black */}
            <div className="text-center space-y-4">
              <h3 className="font-semibold text-black">Black Version</h3>
              <div className="flex flex-col items-center space-y-4 p-4 bg-gray-100 rounded-lg">
                <GrytLogo size="lg" variant="black" />
                <GrytWordmark size="md" variant="black" />
                <GrytLogoFull size="sm" variant="black" />
              </div>
            </div>

            {/* White */}
            <div className="text-center space-y-4">
              <h3 className="font-semibold text-black">White Version</h3>
              <div className="flex flex-col items-center space-y-4 p-4 bg-gray-900 rounded-lg">
                <GrytLogo size="lg" variant="white" />
                <GrytWordmark size="md" variant="white" />
                <GrytLogoFull size="sm" variant="white" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Size Variations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-black">Size Variations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-center space-x-8">
            <div className="text-center">
              <GrytLogoFull size="sm" variant="full-color" />
              <Badge variant="outline" className="mt-2">Small</Badge>
            </div>
            <div className="text-center">
              <GrytLogoFull size="md" variant="full-color" />
              <Badge variant="outline" className="mt-2">Medium</Badge>
            </div>
            <div className="text-center">
              <GrytLogoFull size="lg" variant="full-color" />
              <Badge variant="outline" className="mt-2">Large</Badge>
            </div>
            <div className="text-center">
              <GrytLogoFull size="xl" variant="full-color" />
              <Badge variant="outline" className="mt-2">Extra Large</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Palette */}
      <Card>
        <CardHeader>
          <CardTitle className="text-black">Color Palette</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {colorPalette.map((color) => (
              <div key={color.name} className="text-center">
                <div 
                  className="w-full h-20 rounded-lg border-2 border-gray-200 mb-2"
                  style={{ backgroundColor: color.hex }}
                ></div>
                <h4 className="font-medium text-sm text-black">{color.name}</h4>
                <p className="text-xs text-gray-600">{color.hex}</p>
                <p className="text-xs text-gray-500">{color.rgb}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gradients */}
      <Card>
        <CardHeader>
          <CardTitle className="text-black">Gradients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {gradients.map((gradient) => (
              <div key={gradient.name}>
                <div 
                  className="w-full h-16 rounded-lg mb-3"
                  style={{ background: gradient.css }}
                ></div>
                <h4 className="font-medium text-black">{gradient.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{gradient.description}</p>
                <code className="text-xs bg-gray-100 p-2 rounded block text-black">
                  {gradient.css}
                </code>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle className="text-black">Typography</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 text-black">Font Family</h4>
              <p className="text-black font-bold text-lg" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                System Font Stack
              </p>
              <code className="text-xs bg-gray-100 p-2 rounded block mt-2 text-black">
                -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
              </code>
            </div>
            
            <div>
              <h4 className="font-medium mb-2 text-black">Font Weight</h4>
              <p className="text-black" style={{ fontWeight: 800 }}>800 (Extra Bold)</p>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-black">Letter Spacing</h4>
              <p className="text-black" style={{ letterSpacing: '-0.02em' }}>-0.02em (Tight)</p>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-black">Motion Style</h4>
              <p className="text-black italic transform -skew-x-6">Forward-leaning italic (6° skew)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-black">Usage Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-green-600">✅ Do</h4>
              <ul className="text-sm space-y-1 text-black">
                <li>• Use the full-color version on light backgrounds</li>
                <li>• Use the white version on dark backgrounds</li>
                <li>• Use the black version for print materials</li>
                <li>• Maintain clear space around the logo</li>
                <li>• Keep the icon and wordmark proportional</li>
                <li>• Use the motion line for dynamic applications</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-red-600">❌ Don't</h4>
              <ul className="text-sm space-y-1 text-black">
                <li>• Stretch or distort the logo</li>
                <li>• Use low contrast color combinations</li>
                <li>• Place on busy backgrounds</li>
                <li>• Remove the motion elements</li>
                <li>• Use outdated versions</li>
                <li>• Apply additional effects or filters</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Minimum Sizes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-black">Minimum Sizes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <GrytLogo size="sm" variant="full-color" />
              <p className="text-sm mt-2 text-black">Icon Only: 24px minimum</p>
            </div>
            <div className="text-center">
              <GrytWordmark size="sm" variant="full-color" />
              <p className="text-sm mt-2 text-black">Wordmark: 18px minimum</p>
            </div>
            <div className="text-center">
              <GrytLogoFull size="sm" variant="full-color" />
              <p className="text-sm mt-2 text-black">Full Logo: 32px minimum</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrytStyleGuide;
