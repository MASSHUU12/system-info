export const cpuLoadPS1 =
  "Get-WmiObject Win32_Processor | Measure-Object -Property LoadPercentage -Average | Select Average";

export const cpuLoadSH = `
  #!/bin/bash

  CPU_USAGE=$(top -b -n2 -p 1 | fgrep "Cpu(s)" | tail -1 | awk -F'id,' -v prefix="$prefix" '{ split($1, vs, ","); v=vs[length(vs)]; sub("%", "", v); printf "%s%.1f%%\n", prefix, 100 - v }')

  echo $CPU_USAGE`;

export const cpuLoadMac = `
  ps -A -o %cpu | awk '{s+=$1} END {print s "%"}'
`;
