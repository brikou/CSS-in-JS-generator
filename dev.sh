#!/bin/bash

set -eux

cd $(dirname $(readlink --canonicalize $0))

tmux new-session -d
tmux send-keys 'tsc --watch' C-m

tmux split-window
tmux select-layout even-vertical
tmux send-keys 'jest --watch' C-m

tmux split-window
tmux select-layout even-vertical
tmux send-keys 'yarn outdated' C-m

tmux attach-session
