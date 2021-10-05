for i in models/*.js; do
  echo $i
	sed -i 's/timestamps: false,/timestamps: true,/g' $i
done
