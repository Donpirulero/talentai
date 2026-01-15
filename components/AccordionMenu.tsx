import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface AccordionItem {
    label: string;
    path?: string;
    subItems?: AccordionSubItem[];
}

interface AccordionSubItem {
    label: string;
    path: string;
}

interface AccordionMenuProps {
    title: string;
    icon: React.ElementType;
    items: AccordionItem[];
    defaultOpen?: boolean;
}

const AccordionMenu: React.FC<AccordionMenuProps> = ({ title, icon: Icon, items, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const location = useLocation();

    const isItemActive = (path?: string) => {
        if (!path) return false;
        return location.pathname.startsWith(path);
    };

    const hasActiveChild = items.some(item =>
        isItemActive(item.path) || item.subItems?.some(sub => isItemActive(sub.path))
    );

    return (
        <div className="mb-1">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
          w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all
          ${hasActiveChild || isOpen
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }
        `}
            >
                <div className="flex items-center gap-3">
                    <Icon size={20} />
                    <span className="font-medium text-sm">{title}</span>
                </div>
                {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {/* Accordion Content */}
            <div
                className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}
        `}
            >
                <div className="ml-4 border-l border-slate-700 pl-3 space-y-1">
                    {items.map((item, index) => (
                        <div key={index}>
                            {item.path ? (
                                <Link
                                    to={item.path}
                                    className={`
                    block px-3 py-2 rounded-md text-sm transition-colors
                    ${isItemActive(item.path)
                                            ? 'bg-primary/20 text-primary font-medium'
                                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                        }
                  `}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <div className="px-3 py-2 text-sm text-slate-500 font-medium">
                                    {item.label}
                                </div>
                            )}

                            {/* Sub-items */}
                            {item.subItems && (
                                <div className="ml-3 mt-1 space-y-1 border-l border-slate-700 pl-2">
                                    {item.subItems.map((subItem, subIndex) => (
                                        <Link
                                            key={subIndex}
                                            to={subItem.path}
                                            className={`
                        block px-3 py-1.5 rounded-md text-xs transition-colors
                        ${isItemActive(subItem.path)
                                                    ? 'bg-primary/20 text-primary font-medium'
                                                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                                }
                      `}
                                        >
                                            {subItem.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AccordionMenu;
