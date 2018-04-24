<template>
    <div>
        <h3>个人博客</h3>
        <img src="http://imgsrc.baidu.com/imgad/pic/item/3b87e950352ac65cf42e224ef0f2b21193138ae0.jpg" class="imgs" alt="">
        <dl>
            <dt><img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1524573700&di=eecfa26b4c2fd9a51e06092064517b7e&src=http://a.hiphotos.baidu.com/zhidao/pic/item/34fae6cd7b899e510774d7d047a7d933c9950d7f.jpg" alt=""></dt>
            <dd>
                <p>标题</p>
                <p></p>
            </dd>
        </dl>
        <dl>

            <dd>
                <p>标题</p>
                <p></p>
            </dd>
            <dt><img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1524573700&di=eecfa26b4c2fd9a51e06092064517b7e&src=http://a.hiphotos.baidu.com/zhidao/pic/item/34fae6cd7b899e510774d7d047a7d933c9950d7f.jpg" alt=""></dt>
        </dl>
        <dl>
            <dt><img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1524573700&di=eecfa26b4c2fd9a51e06092064517b7e&src=http://a.hiphotos.baidu.com/zhidao/pic/item/34fae6cd7b899e510774d7d047a7d933c9950d7f.jpg" alt=""></dt>
            <dd>
                <p>标题</p>
                <p></p>
            </dd>
        </dl>
        <dl>

            <dd>
                <p>标题</p>
                <p></p>
            </dd>
            <dt><img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1524573700&di=eecfa26b4c2fd9a51e06092064517b7e&src=http://a.hiphotos.baidu.com/zhidao/pic/item/34fae6cd7b899e510774d7d047a7d933c9950d7f.jpg" alt=""></dt>
        </dl>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                wen: []
            }
        }
    },
    mounted() {
        this.axios.get("/api/back/class/getOneClass").then((data) => {
            let datas = data.data.data
            this.form.wen = datas
            console.log(this.form.wen)
        })
    },
}
</script>
  <style scoped>
.imgs {
    width: 100%;
    height: 500px;
}

dl {
    width: 100%;
    height: 100%;
    float: left;
    background: #ccc;
}

dl dt {
    float: left;
    width: 300px;
    height: 250px;
}

dl dd {
    float: left;
    width: 700px;
    height: 250px;
}

dt img {
    width: 200px;
    height: 200px;
    margin-left: 30px;
    margin-top: 30px;
}
</style>
