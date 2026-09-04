import {
  Activity,
  ArrowLeft,
  ArrowRight,
  AudioLines,
  Bot,
  Brain,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Database,
  ExternalLink,
  Eye,
  FileText,
  Gauge,
  GitBranch,
  Github,
  Globe,
  LayoutGrid,
  Linkedin,
  Loader2,
  Mail,
  Menu,
  MessageSquare,
  Network,
  Radar,
  Rocket,
  ScanEye,
  Search,
  ShieldCheck,
  Sliders,
  Sparkles,
  Target,
  ThumbsUp,
  Twitter,
  Wand2,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  activity: Activity,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "audio-lines": AudioLines,
  bot: Bot,
  brain: Brain,
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  circle: Circle,
  database: Database,
  "external-link": ExternalLink,
  eye: Eye,
  "file-text": FileText,
  gauge: Gauge,
  "git-branch": GitBranch,
  github: Github,
  globe: Globe,
  "layout-grid": LayoutGrid,
  linkedin: Linkedin,
  "loader-2": Loader2,
  mail: Mail,
  menu: Menu,
  "message-square": MessageSquare,
  network: Network,
  radar: Radar,
  rocket: Rocket,
  "scan-eye": ScanEye,
  search: Search,
  "shield-check": ShieldCheck,
  sliders: Sliders,
  sparkles: Sparkles,
  target: Target,
  "thumbs-up": ThumbsUp,
  twitter: Twitter,
  "wand-2": Wand2,
  x: X,
  zap: Zap,
};

interface IconProps {
  name: string;
  className?: string;
  size?: number;
  "aria-hidden"?: boolean | "true" | "false";
}

/** Render a lucide icon by name with a graceful fallback. */
export function Icon({ name, className, size = 20, ...props }: IconProps) {
  const IconComponent = iconMap[name] ?? Circle;
  return <IconComponent className={cn("shrink-0", className)} size={size} {...props} />;
}