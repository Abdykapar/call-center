<template>
	<div class="main">
		<form class="form-inline" @submit.prevent="searchUsername">
			<input type="text" v-model="oldUsername" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2"
			       :placeholder="$lang.words.username">
			
			<button type="submit" class="btn btn-primary mb-2">
				<i class="fa fa-search"></i>
			</button>
		</form>
		<form @submit.prevent="submit" v-if="isUserFound">
			<div class="form-group">
				<label>{{ $lang.words.fullName }}</label>
				<input readonly type="text" class="form-control" v-model="fullName" :placeholder="$lang.words.fullName">
			</div>
			<div class="form-group">
				<label>{{ $lang.words.username }}</label>
				<input readonly type="text" class="form-control" :class="{'is-invalid' : errors.has('username')}"
				       v-model="username" name="username" v-validate="'required'" :placeholder="$lang.words.username">
			</div>
			<div class="form-group">
				<label>{{ $lang.words.newPassword }}</label>
				<input type="text" class="form-control" :class="{'is-invalid' : errors.has('password')}" ref="password"
				       v-model="newPassword" name="password" v-validate="'required'"
				       :placeholder="$lang.words.newPassword">
			</div>
			<div class="form-group">
				<label>{{ $lang.words.confirmPassword }}</label>
				<input v-validate="'required|confirmed:password'"
				       :class="{'is-invalid' : errors.has('confirmPassword')}" class="form-control"
				       v-model="confirmPassword" name="confirmPassword" type="text"
				       :placeholder="$lang.words.confirmPassword">
				<div class="invalid-feedback">
					{{ $lang.words.confirmPasswordError }}
				</div>
			</div>
			<button type="submit" class="btn btn-primary">{{ $lang.words.save }}</button>
		</form>
	</div>
</template>

<script>
import {userService} from '@/_services';

export default {
	name: "PasswordReset",
	data() {
		return {
			newPassword: '',
			confirmPassword: '',
			hasError: false,
			username: '',
			oldUsername: '',
			isUserFound: false,
			fullName: ''
		}
	},
	computed: {
		user() {
			return this.$store.state.account.user.user;
		}
	},
	methods: {
		submit() {
			this.checkEquality();
			this.$validator.validate().then(valid => {
				if (valid && !this.hasError) {
					const data = {
						password: this.newPassword,
						username: this.username
					};
					userService.editProfile(data).then(() => {
						this.$toaster.success(this.$lang.words.successMessage, {timeout: 2000});
						this.$emit('close');
						this.isUserFound = false;
						this.oldUsername = '';
						this.username = '';
						this.newPassword = '';
						this.confirmPassword = '';
					}).catch(err => console.log(err));
				}
			})
		},
		checkEquality() {
			this.hasError = this.newPassword !== this.confirmPassword;
		},
		searchUsername() {
			userService.getByUsername(this.oldUsername).then(res => {
				this.isUserFound = true;
				this.username = res.username;
				this.newPassword = res.username;
				this.confirmPassword = res.username;
				this.fullName = `${res.firstName} ${res.lastName}`
			}).catch(err => {
				this.$toaster.error(this.$lang.words.userNotFound, {timeout: 3000});
				this.isUserFound = false;
				console.log(err)
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.submit-btn {
	float: right;
}

.settings {
	display: inline;
	color: white !important;
	height: auto !important;
	text-transform: capitalize;
	font-weight: normal !important;
	font-size: 16px;
	margin: 5px 0 0 0;
	padding: 0 0 5px 0;
}

.settings-counter {
	background-color: #F0783A;
	padding: 3px 5px !important;
	border-radius: 15px;
	margin: 5px 0 0 0 !important;
	border: none !important;
	font-size: 15px;
}

.logout {
	margin-left: 10px;
}

.main {
	display: inline;
}

.md-button {
	margin: 2px 0 !important;
}
</style>
