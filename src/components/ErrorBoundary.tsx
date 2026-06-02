import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Membraneinsight water render error:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-slate-950 text-slate-200">
          <div className="max-w-lg">
            <h1 className="text-xl font-bold text-red-400 mb-2">页面加载出错</h1>
            <p className="text-sm text-slate-400 mb-4">{this.state.error.message}</p>
            <p className="text-xs text-slate-500">
              请确认已运行 <code className="text-brand-400">npm install</code> 与{' '}
              <code className="text-brand-400">npm run dev</code>，并在浏览器打开终端中的本地地址（勿直接双击 index.html）。
            </p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
