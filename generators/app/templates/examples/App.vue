<template>
	<div id="root">
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'App'
};
</script>

<style>
html,
body {
	width: 100%;
	height: 100%;
	overflow: hidden;
	margin: 0;
	padding: 0;
}

#root {
	width: 100%;
	height: 100%;
}
</style>
