#!/bin/zsh
# Kill process listening on given port (default 5000)
PORT=${1:-5000}
PID=$(lsof -tiTCP:${PORT} -sTCP:LISTEN -n -P)
if [ -z "$PID" ]; then
  echo "No process is listening on port ${PORT}"
  exit 0
fi

echo "Killing process $PID listening on port ${PORT}"
kill $PID
sleep 1
if kill -0 $PID 2>/dev/null; then
  echo "Process did not stop, forcing..."
  kill -9 $PID
fi

echo "Done."
