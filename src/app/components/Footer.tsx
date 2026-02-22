export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-white text-2xl font-bold tracking-tight">
                Tommy Kovatch
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering families to achieve lasting financial freedom through transparent, accessible strategies.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg mb-4">Contact Us</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Email: info@tommykovatch.com</p>
              </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Tommy Kovatch. All rights reserved.</p>
            <p>GLBA Compliant | Your Privacy is Protected</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
