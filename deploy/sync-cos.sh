#!/usr/bin/env bash
set -euo pipefail

project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
default_coscli="coscli"
if ! command -v "$default_coscli" >/dev/null 2>&1 && [[ -x "${HOME}/.local/bin/coscli" ]]; then
  default_coscli="${HOME}/.local/bin/coscli"
fi
coscli_bin="${COSCLI_BIN:-$default_coscli}"
bucket_alias="${COS_BUCKET_ALIAS:-jentoor}"
snapshot_dir="${COS_SNAPSHOT_DIR:-$project_dir/.coscli-snapshot}"

if ! command -v "$coscli_bin" >/dev/null 2>&1; then
  echo "COSCLI is not installed. Set COSCLI_BIN or install Tencent Cloud COSCLI." >&2
  exit 1
fi

mkdir -p "$snapshot_dir/media" "$snapshot_dir/certificates"

"$coscli_bin" sync "$project_dir/public/media/" "cos://$bucket_alias/media/" \
  --recursive \
  --snapshot-path "$snapshot_dir/media" \
  --meta 'Cache-Control:public,max-age=31536000,immutable' \
  --retry-num 3

"$coscli_bin" sync "$project_dir/public/certificates/" "cos://$bucket_alias/certificates/" \
  --recursive \
  --snapshot-path "$snapshot_dir/certificates" \
  --meta 'Cache-Control:public,max-age=86400' \
  --retry-num 3

echo "COS sync complete for media and certificates."
