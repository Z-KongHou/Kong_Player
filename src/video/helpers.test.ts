import { describe, expect, it } from 'vitest'
import { formatVideoDuration, videoStatusLabel } from './helpers'

describe('formatVideoDuration', () => {
  it('formats seconds as mm:ss', () => {
    expect(formatVideoDuration(125)).toBe('02:05')
  })

  it('formats zero seconds', () => {
    expect(formatVideoDuration(0)).toBe('00:00')
  })

  it('returns placeholder for null', () => {
    expect(formatVideoDuration(null)).toBe('--:--')
  })

  it('returns placeholder for NaN', () => {
    expect(formatVideoDuration(Number.NaN)).toBe('--:--')
  })
})

describe('videoStatusLabel', () => {
  it('maps READY', () => {
    expect(videoStatusLabel('READY')).toBe('可播放')
  })

  it('maps UPLOADING', () => {
    expect(videoStatusLabel('UPLOADING')).toBe('上传中')
  })

  it('maps FAILED', () => {
    expect(videoStatusLabel('FAILED')).toBe('失败')
  })
})
