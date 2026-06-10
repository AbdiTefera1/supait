import { Shield, HardDrive, Monitor, Wifi, Globe, Headphones, Lock, Printer, Users, BookOpen, Cloud, Search, Wrench, Zap, Star } from 'lucide-react'

const icons: Record<string, React.ElementType> = {
  Shield, HardDrive, Monitor, Wifi, Globe, Headphones, Lock, Printer, Users, BookOpen, Cloud, Search, Wrench, Zap, Star
}

export default function ServiceIcon({ name, size = 24, className = '' }: { name: string, size?: number, className?: string }) {
  const Icon = icons[name] || Wrench
  return <Icon size={size} className={className} />
}
