
export interface AppRouteConfigType {
    path: string
    name: string
    render?: () => JSX.Element
    component?: React.ComponentType<any>
    mustAuthored: boolean
  }