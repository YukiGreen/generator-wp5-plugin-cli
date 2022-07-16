<template>
	<el-container class="layout">
		<el-aside width="200px">
			<el-row class="tac">
				<div class="author">
					<img src="./assets/images/sunline_logo.png" alt="element-logo" class="nav-logo" />
				</div>
				<el-col>
					<el-menu
						class="el-menu-vertical-demo"
						@open="handleOpen"
						@close="handleClose"
						:default-active="$router.currentRoute.path.split('/')[1]"
						router
					>
						<div v-for="(item, index) in navsData[lang]" :key="index">
							<el-submenu v-if="!item.path && !item.href" :index="item.name">
								<template slot="title">{{ item.name }}</template>
								<el-menu-item
									v-for="(child, cIndex) in item.children"
									:key="cIndex"
									:index="base + child.path"
								>
									<span slot="title">{{ child.name }}</span>
								</el-menu-item>
							</el-submenu>
							<el-menu-item v-else :index="base + item.path">
								<span slot="title">{{ item.name }}</span>
							</el-menu-item>
						</div>
					</el-menu>
				</el-col>
			</el-row>
		</el-aside>
		<el-container>
			<el-header>
				<span>使用案例</span>
				<span class="change-language">
					<el-dropdown @command="handleCommand" trigger="click">
						<span class="el-dropdown-link">
							{{currentLanguage}}
							<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="zh">中文</el-dropdown-item>
							<el-dropdown-item command="en">英文</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</span>
				<span class="out-system" @click="outSystem">
					<i class="el-icon-switch-button"></i>
					退出系统
				</span>
			</el-header>
			<el-main>
				<!-- 判断路由是否包含microWeb,包含则为子应用,不含则走路由出口 -->
				<router-view />
			</el-main>
		</el-container>
	</el-container>
</template>
<script>
import navsData from '../nav.config.json';

export default {
	name: 'layout',
	data () {
		return {
			lang: 'zh-CN',
			base: '/component',
			navsData,
			currentLanguage: '中文'
		};
	},
	methods: {
		handleOpen (key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose (key, keyPath) {
			console.log(key, keyPath);
		},
		handleCommand (command) {
			localStorage.setItem('LANGUAGE_STYLE', command);
			command === 'zh' ? (this.currentLanguage = '中文') : (this.currentLanguage = '英文');
			this.$i18n.locale = command;
			location.reload();
		},
		outSystem () {
			this.$confirm('是否确认退出', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					window.localStorage.clear();
					window.sessionStorage.clear();
					this.$message({
						type: 'success',
						message: '退出成功!'
          });
          console.log(this.$router, 'routerterere');
					this.$router.push({ path: '/login' });
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '取消退出'
					});
				});
		}
	},
	mounted () {
		let locallang = localStorage.getItem('LANGUAGE_STYLE');
		if (locallang) {
			locallang === 'zh' ? (this.currentLanguage = '中文') : (this.currentLanguage = '英文');
		} else {
			localStorage.setItem('LANGUAGE_STYLE', 'zh');
			this.currentLanguage = '中文';
		}
	}
};
</script>
<style lang="less">
.layout {
	width: 100%;
	height: 100%;
}

.el-header {
	background-color: rgb(240, 242, 245);
	color: #333;
	text-align: center;
	line-height: 60px;
	height: 60px;
	border-bottom: 1px solid rgb(237, 237, 237);
}

.el-menu {
	border-right: none;
	background-color: #000;
}

.el-aside {
	background-color: rgb(0, 21, 41);
	color: #333;
	text-align: left;
	line-height: 60px;

	.tac {
		.author {
			height: 60px;
			border-bottom: 1px solid rgb(237, 237, 237);
			font-size: 18px;
			font-weight: 600;
			font-family: 'Microsoft YaHei', SimHei;
			color: #fff;

			img {
				width: 100%;
				height: 60px;
			}
		}

		.el-submenu {
			.el-submenu__title:hover {
				background-color: #44719a;
			}

			.el-submenu__title {
				color: #eee;
			}
		}
		ul.el-menu-vertical-demo.el-menu {
			background-color: #001529;

			.el-menu-item {
				color: rgba(255, 255, 255, 0.65);
			}

			.el-menu-item.is-active,
			.el-menu-item:focus,
			.el-menu-item:hover {
				outline: 0;
				background-color: #44719a;
				color: #fff !important;
			}
		}
	}
}

.el-main {
	background-color: #ffffff;
	color: #333;
}

body > .el-container {
	margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
	line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
	line-height: 320px;
}

.out-system,
.change-language {
	position: absolute;
	right: 10px;
	display: inline-block;
	font-size: 14px;
	cursor: pointer;
}
.change-language {
	right: 100px;
}
.out-system:hover,
.change-language:hover {
	color: #409eff;
	border-radius: 4px;
}
</style>
