/**
 * @module mouseEvents
 */
/**
 * Växlar outline för ett element vid klick.
 * @param {MouseEvent} e - Klickhändelsen.
 */
export function toggleSelectedClass (e) {
  e.target.classList.toggle('selected')
  console.log(`Element klickat: ID=${e.target.id}, Markering=${e.target.classList.contains('selected')}`)
}

/**
 * Tar bort ett element från sidan vid dubbelklick.
 * @param {MouseEvent} e - Dubbelklickhändelsen.
 */
export function handleDoubleClick (e) {
  console.log(`Dubbelklick på element: ID=${e.target.id}, påbörjar borttagningsanimation.`)
  e.target.classList.add('animateSize')
  e.target.style.width = '2px'
  e.target.style.height = '2px'

  setTimeout(() => {
    console.log(`Element borttaget: ID=${e.target.id}`)
    e.target.remove()
  }, 2000)
}
