import truncateHash from "./truncateHash"

describe('utils', () => {
 describe("#truncateHash", () => {
    it('should truncate a hash with default parameters', () => {
        const hash = '0x1234567890abcdef1234567890abcdef12345678'
        const result = truncateHash(hash)
        expect(result).toBe('0x12...5678')
      })
    
      it('should truncate a hash with custom lengths', () => {
        const hash = '0x1234567890abcdef1234567890abcdef12345678'
        const result = truncateHash(hash, 6, 8)
        expect(result).toBe('0x1234...12345678')
      })
    
      it('should handle short addresses correctly', () => {
        const hash = '0x1234567890'
        const result = truncateHash(hash)
        expect(result).toBe('0x12...7890')
      })
    
      it('should handle empty string', () => {
        const hash = ''
        const result = truncateHash(hash)
        expect(result).toBe('')
      })
 })
})
