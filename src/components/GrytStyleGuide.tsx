
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import GrytLogo from './GrytLogo';
import GrytWordmark from './GrytWordmark';
import GrytLogoFull from './GrytLogoFull';

const GrytStyleGuide = () => {
  const colorPalette = [
    { name: 'Slate Dark', hex: '#1E293B', rgb: 'rgb(30, 41, 59)' },
    { name: 'Blue Primary', hex: '#2563EB', rgb: 'rgb(37, 99, 235)' },
    { name: 'Indigo Deep', hex: '#4338CA', rgb: 'rgb(67, 56, 202)' },
    { name: 'Golden Accent', hex: '#FFC107', rgb: 'rgb(255, 193, 7)' },
    { name: 'Black', hex: '#000000', rgb: 'rgb(0, 0, 0)' },
    { name: 'White', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)' }
  ];

  const gradients = [
    {
      name: 'Primary Brand Gradient',
      css: 'linear-gradient(135deg, #1E293B 0%, #2563EB 50%, #4338CA 100%)',
      description: 'Main logo gradient - purposeful and strong'
    },
    {
      name: 'Text Gradient',
      css: 'linear-gradient(90deg, #1E293B 0%, #2563EB 50%, #4338CA 100%)',
      description: 'Horizontal gradient for wordmark and headings'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-black">Gryt Brand Identity</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          A bold, purposeful visual identity that embodies action, grit, and the journey of turning ambition into identity.
        </p>
      </div>

      {/* Hero Logo Display */}
      <Card className="bg-gradient-to-br from-slate-50 to-blue-50 border-2">
        <CardContent className="p-12 text-center">
          <GrytLogoFull size="xl" variant="full-color" showTagline={true} />
        </CardContent>
      </Card>

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
              <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg border">
                <GrytLogo size="lg" variant="full-color" />
                <GrytWordmark size="md" variant="full-color" />
                <GrytLogoFull size="sm" variant="full-color" />
              </div>
            </div>

            {/* Black */}
            <div className="text-center space-y-4">
              <h3 className="font-semibold text-black">Black Version</h3>
              <div className="flex flex-col items-center space-y-4 p-6 bg-gray-100 rounded-lg">
                <GrytLogo size="lg" variant="black" />
                <GrytWordmark size="md" variant="black" />
                <GrytLogoFull size="sm" variant="black" />
              </div>
            </div>

            {/* White */}
            <div className="text-center space-y-4">
              <h3 className="font-semibold text-black">White Version</h3>
              <div className="flex flex-col items-center space-y-4 p-6 bg-slate-800 rounded-lg">
                <GrytLogo size="lg" variant="white" />
                <GrytWordmark size="md" variant="white" />
                <GrytLogoFull size="sm" variant="white" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layout Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-black">Layout Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center space-y-4">
              <h3 className="font-semibold text-black">Horizontal Layout</h3>
              <div className="flex justify-center p-6 bg-slate-50 rounded-lg">
                <GrytLogoFull size="lg" variant="full-color" layout="horizontal" />
              </div>
            </div>
            <div className="text-center space-y-4">
              <h3 className="font-semibold text-black">Vertical Layout</h3>
              <div className="flex justify-center p-6 bg-slate-50 rounded-lg">
                <GrytLogoFull size="lg" variant="full-color" layout="vertical" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tagline Lockup */}
      <Card>
        <CardHeader>
          <CardTitle className="text-black">Tagline Lockup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="p-8 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg">
              <GrytLogoFull size="lg" variant="full-color" layout="vertical" showTagline={true} />
            </div>
            <p className="text-sm text-gray-600">Use the tagline version for marketing materials and brand introductions</p>
          </div>
        </CardContent>
      </Card>

      {/* Color Palette */}
      <Card>
        <CardHeader>
          <CardTitle className="text-black">Color Palette</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
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
          <CardTitle className="text-black">Brand Gradients</CardTitle>
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
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3 text-black">Main Wordmark</h4>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-black font-black text-3xl mb-2" style={{ 
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Helvetica Neue", Arial, sans-serif',
                  fontWeight: 900,
                  letterSpacing: '-0.03em'
                }}>
                  Gryt
                </p>
                <p className="text-sm text-gray-600">Font Weight: 900 (Black) | Letter Spacing: -0.03em</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-black">Tagline</h4>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-slate-600 font-medium" style={{ 
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Helvetica Neue", Arial, sans-serif',
                  letterSpacing: '0.02em'
                }}>
                  Turn ambition into identity.
                </p>
                <p className="text-sm text-gray-600 mt-2">Font Weight: 500 (Medium) | Letter Spacing: 0.02em</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-black">Font Stack</h4>
              <code className="text-xs bg-gray-100 p-2 rounded block text-black">
                -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Helvetica Neue", Arial, sans-serif
              </code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Brand Attributes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-black">Brand Attributes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-2">Action</h4>
              <p className="text-sm text-blue-700">Forward momentum, progress arrows, dynamic elements</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <h4 className="font-bold text-slate-800 mb-2">Identity</h4>
              <p className="text-sm text-slate-700">Personal transformation, mountain journeys, achievement sparks</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-bold text-yellow-800 mb-2">Grit</h4>
              <p className="text-sm text-yellow-700">Strong typography, bold gradients, purposeful design</p>
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
                <li>• Use the full-color version as primary</li>
                <li>• Maintain clear space around the logo</li>
                <li>• Use tagline version for brand introductions</li>
                <li>• Keep the forward momentum elements</li>
                <li>• Use on clean, uncluttered backgrounds</li>
                <li>• Scale proportionally</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-red-600">❌ Don't</h4>
              <ul className="text-sm space-y-1 text-black">
                <li>• Stretch or distort the logo</li>
                <li>• Remove the arrow or achievement elements</li>
                <li>• Use on busy or conflicting backgrounds</li>
                <li>• Change the color combinations</li>
                <li>• Use outdated versions</li>
                <li>• Apply additional effects or outlines</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrytStyleGuide;
