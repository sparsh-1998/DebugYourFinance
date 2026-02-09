import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

/**
 * Reusable alert banner component for warnings, errors, success, and info messages
 */
export default function AlertBanner({
  type = 'info',
  title,
  message,
  children,
  className = ''
}) {
  const config = {
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-50 dark:bg-red-900/30',
      borderColor: 'border-red-500 dark:border-red-600',
      iconColor: 'text-red-500 dark:text-red-400',
      titleColor: 'text-red-700 dark:text-red-300',
      textColor: 'text-red-600 dark:text-red-400'
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/30',
      borderColor: 'border-yellow-500 dark:border-yellow-600',
      iconColor: 'text-yellow-500 dark:text-yellow-400',
      titleColor: 'text-yellow-700 dark:text-yellow-300',
      textColor: 'text-yellow-600 dark:text-yellow-400'
    },
    success: {
      icon: CheckCircle2,
      bgColor: 'bg-green-50 dark:bg-green-900/30',
      borderColor: 'border-green-500 dark:border-green-600',
      iconColor: 'text-green-500 dark:text-green-400',
      titleColor: 'text-green-700 dark:text-green-300',
      textColor: 'text-green-600 dark:text-green-400'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50 dark:bg-blue-900/30',
      borderColor: 'border-blue-500 dark:border-blue-600',
      iconColor: 'text-blue-500 dark:text-blue-400',
      titleColor: 'text-blue-700 dark:text-blue-300',
      textColor: 'text-blue-600 dark:text-blue-400'
    }
  };

  const { icon: Icon, bgColor, borderColor, iconColor, titleColor, textColor } = config[type];

  return (
    <div className={`p-4 rounded-lg border-2 flex items-start space-x-3 ${bgColor} ${borderColor} ${className}`}>
      <Icon className={`h-6 w-6 flex-shrink-0 mt-0.5 ${iconColor}`} />
      <div className="flex-1">
        {title && <p className={`font-semibold ${titleColor}`}>{title}</p>}
        {message && <p className={`text-sm mt-1 ${textColor}`}>{message}</p>}
        {children && <div className={`text-sm mt-1 ${textColor}`}>{children}</div>}
      </div>
    </div>
  );
}
