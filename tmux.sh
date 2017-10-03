#!/bin/bash

set -eux

tmux new-session -d

tmux split-window -t :0.0 -v
tmux split-window -t :0.0 -v

tmux send-keys -t :0.0 'npx tsc --pretty --watch' C-m
tmux send-keys -t :0.2 'npx jest --watch' C-m

tmux select-pane -t :0.1

tmux attach-session
