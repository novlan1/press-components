set -ex

echo $MANUAL_REVIEWER
echo $MANUAL_REVIEW_SUGGEST
echo $MANUAL_REVIEW_RESULT

packageName=$1
echo $packageName

if [[ $MANUAL_REVIEW_RESULT != 'PROCESS' ]]; then
  echo "[Error] Not Review"
  exit 1
fi;

pnpm install

git remote remove origin
git remote add origin git@git.a.com:pmd-mobile/pmd-h5/press-components.git

pnpm run build

pnpm --filter="$packageName" release patch needVersionTip


