
export const visibility: VisibilityType = {
    zIndex: {
        'highest': 1000,
        'hight': 900,
        'medium': 500,
        'low': 100, 
        'lowest': 10
    }
}
 
 export type VisibilityType = {
    zIndex: Record<string, number>
 }
 