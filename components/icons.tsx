import React from 'react';

// UI Icons
export const AnimatedMenuIcon = ({ isOpen }: { isOpen: boolean }) => (
    <div className="w-6 h-6 relative" aria-live="polite">
      <span className={`block absolute left-0 top-[6px] h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 top-1/2 -translate-y-1/2' : ''}`}></span>
      <span className={`block absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-current transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
      <span className={`block absolute left-0 bottom-[6px] h-0.5 w-full bg-current transform transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 bottom-1/2 translate-y-1/2' : ''}`}></span>
    </div>
);

export const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
);

export const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
);

export const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);

export const GithubIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
        src="https://img.icons8.com/?size=100&id=12599&format=png&color=FFFFFF"
        alt="GitHub Icon"
        loading="lazy"
        decoding="async"
        {...props}
    />
);

export const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

export const LinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
);

export const DevToIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M7 2h10v4h-2V4H9v2H7V2zm14 18H3V8h18v12zM5 10v8h14v-8H5zm6 2h2v4h-2v-4z"></path>
    </svg>
);

export const GitLabIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
        src="https://img.icons8.com/?size=100&id=xNOPrIk9lLyq&format=png&color=FFFFFF"
        alt="GitLab Icon"
        loading="lazy"
        decoding="async"
        {...props}
    />
);

export const LicenseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" {...props}>
        <path d="M8.75.75V2h.985c.304 0 .603.08.867.231l1.29.736c.038.022.08.033.124.033h2.234a.75.75 0 0 1 0 1.5h-.427l2.111 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.006.005-.01.01-.045.04c-.21.176-.441.327-.686.45C14.556 10.78 13.88 11 13 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L12.178 4.5h-.162c-.305 0-.604-.079-.868-.231l-1.29-.736a.245.245 0 0 0-.124-.033H8.75V13h2.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h2.5V3.5h-.984a.245.245 0 0 0-.124.033l-1.289.737c-.265.15-.564.23-.869.23h-.162l2.112 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.016.015-.045.04c-.21.176-.441.327-.686.45C4.556 10.78 3.88 11 3 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L2.178 4.5H1.75a.75.75 0 0 1 0-1.5h2.234a.249.249 0 0 0 .125-.033l1.288-.737c.265-.15.564.23.869-.23h.984V.75a.75.75 0 0 1 1.5 0Zm2.945 8.477c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327Zm-10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327Z"></path>
    </svg>
);


export const BrainCircuitIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 5a3 3 0 1 0-5.993.129M12 5a3 3 0 1 1 5.993.129M12 5a3 3 0 1 1-5.993-.129M12 5a3 3 0 1 0 5.993-.129M5.5 12a3 3 0 1 0 0-6M5.5 12a3 3 0 1 1 0-6M18.5 12a3 3 0 1 0 0-6M18.5 12a3 3 0 1 1 0-6M12 19a3 3 0 1 0-5.993-.129M12 19a3 3 0 1 1 5.993.129M12 19a3 3 0 1 1-5.993.129M12 19a3 3 0 1 0 5.993.129M5.5 12a3 3 0 1 1 0 6M5.5 12a3 3 0 1 0 0 6M18.5 12a3 3 0 1 1 0 6M18.5 12a3 3 0 1 0 0 6M12 5v14M12 5a10 10 0 0 1-7-7M12 5a10 10 0 0 0 7-7M12 19a10 10 0 0 1-7 7M12 19a10 10 0 0 0 7 7"/></svg>
);

export const QuillIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m18.5 2.5-16 16L6 21.5l16-16Z"/><path d="m15 5 4 4"/><path d="m5 19-3 3"/></svg>
);

export const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
);

export const VytruveIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M0 40L20 0L40 40H30L20 15L10 40H0Z"></path>
    </svg>
);

export const AppleIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
        src="https://img.icons8.com/?size=100&id=30840&format=png&color=FFFFFF"
        alt="Apple Icon"
        loading="lazy"
        decoding="async"
        {...props}
    />
);

export const DiscordIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
        src="https://img.icons8.com/?size=100&id=30888&format=png&color=FFFFFF"
        alt="Discord Icon"
        loading="lazy"
        decoding="async"
        {...props}
    />
);


// Technology Icons
export const RustIcon = () => <img src="https://www.rust-lang.org/logos/rust-logo-512x512.png" alt="Rust" className="w-full h-full object-contain" />;
export const CppIcon = () => <img src="https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg" alt="C++" className="w-full h-full object-contain" />;
export const PythonIcon = () => <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" alt="Python" className="w-full h-full object-contain" />;
export const JsIcon = () => <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" className="w-full h-full object-contain rounded-md" />;
export const NodeIcon = () => <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" alt="Node.js" className="w-full h-full object-contain" />;
export const ReactIcon = () => <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" className="w-full h-full object-contain" />;
export const LinuxIcon = () => <img src="https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg" alt="Linux" className="w-full h-full object-contain" />;
export const GitIcon = () => <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg" alt="Git" className="w-full h-full object-contain" />;
export const DockerIcon = () => <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg" alt="Docker" className="w-full h-full object-contain" />;
export const CudaIcon = () => <img src="https://developer.nvidia.com/sites/all/themes/devzone/logo-nvidia-cuda-500.png" alt="CUDA" className="w-full h-full object-contain" />;
export const OnnxIcon = () => <img src="https://onnx.ai/images/logo-black.png" alt="ONNX" className="w-full h-full object-contain" />;
export const CiCdIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/><path d="M12 12.04V12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M12 12.04V12a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/><path d="M12 12.04h.01"/></svg>;