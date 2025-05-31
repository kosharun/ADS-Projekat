import React, { createContext, useContext, useState, useEffect } from "react";

// Create context for sidebar state
const SidebarContext = createContext(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export function SidebarProvider({ children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  const [isMobile, setIsMobile] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Toggle sidebar function
  const toggleSidebar = () => {
    if (isMobile) {
      setOpenMobile(!openMobile);
    } else {
      setOpen(!open);
    }
  };

  const value = {
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
    state: open ? "expanded" : "collapsed"
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export function Sidebar({ children, className, ...props }) {
  const { isMobile, openMobile, setOpenMobile, open } = useSidebar();

  if (isMobile) {
    return (
      <>
        {openMobile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setOpenMobile(false)} />
        )}
        <div 
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${
            openMobile ? "translate-x-0" : "-translate-x-full"
          } ${className || ""}`}
          {...props}
        >
          {children}
        </div>
      </>
    );
  }

  return (
    <div 
      className={`h-screen flex-shrink-0 border-r border-gray-200 bg-white transition-all duration-200 ${
        open ? "w-64" : "w-20"
      } ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function SidebarHeader({ className, children, ...props }) {
  return (
    <div
      className={`border-b border-gray-200 p-4 ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function SidebarContent({ className, children, ...props }) {
  return (
    <div
      className={`flex-1 overflow-auto p-3 ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function SidebarFooter({ className, children, ...props }) {
  return (
    <div
      className={`border-t border-gray-200 p-4 ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function SidebarMenu({ className, children, ...props }) {
  return (
    <ul
      className={`space-y-2 ${className || ""}`}
      {...props}
    >
      {children}
    </ul>
  );
}

export function SidebarMenuItem({ className, children, ...props }) {
  return (
    <li
      className={`relative ${className || ""}`}
      {...props}
    >
      {children}
    </li>
  );
}

export function SidebarMenuButton({ 
  className, 
  children, 
  isActive = false, 
  onClick,
  ...props 
}) {
  const { open } = useSidebar();
  
  return (
    <button
      className={`flex items-center w-full rounded-md px-3 py-2 text-sm transition-colors ${
        isActive 
          ? "bg-gray-100 text-gray-900 font-medium" 
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      } ${open ? "" : "justify-center"} ${className || ""}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
