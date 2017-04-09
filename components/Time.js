export default ({minute, second, millisecond}) => (
  <div style={{
    display: 'inline-block',
    maxWidth: '100vw',
    textAlign: 'center',
    wordBreak: 'break-word'
  }}>
    {minute}:{second}:{millisecond}
  </div>
)
