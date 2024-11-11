export default function SendMe({ ...props }) {
  return (
    <div>
      <button onClick={() => props.onHandleClick()}>Hello</button>
      <button onClick={() => props.onHandleClickTwo()}>Hello</button>
    </div>
  );
}
