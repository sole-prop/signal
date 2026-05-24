---
name: signal-design
description: Apply SIGNAL design system to any UI
component or page. Trigger when building components,
pages, dashboards, cards, or any visual element for
the signal-monitor project. Use for all styling
decisions.
---

Color system:
  #0A0A0A  base background
  #111111  card and surface background
  #1E1E1E  borders and dividers
  #F2F2F7  primary text (white)
  #8E8E93  secondary text (grey)
  #48484A  tertiary text (dark grey)

Status states - only color exception:
  UP state:       text #F2F2F7, pill bg #1E1E1E
  DEGRADED state: text #8E8E93, pill bg #1E1E1E
  DOWN state:     text #48484A, pill bg #1E1E1E

Typography rules:
  Numbers always: font-family Geist Mono,
                  font-variant-numeric tabular-nums,
                  font-feature-settings "tnum"
  Labels always:  font-family Geist Sans,
                  uppercase, letter-spacing 0.08em,
                  font-size 10-11px

Card anatomy:
  background: #111111
  border: 1px solid #1E1E1E
  border-radius: 6px
  padding: 24px
  no shadows except: box-shadow 0 1px 3px rgba(0,0,0,0.4)

Progress bars:
  track: #1E1E1E, height 3px, border-radius 2px
  fill: #F2F2F7, transition: width 0.3s ease

Status transitions:
  opacity 0.2s ease only - no other animations
  no bouncing, no scaling, no sliding

Spacing grid: 8px base unit always.
