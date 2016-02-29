class Api::V1::Apt::AssetSetsController < ApplicationController

    def show
        @asset_set = Score.find(params[:id])
        render json: @asset_set
    end

    def update
        @asset_set = AssetSet.find(params[:id])
        if @asset_set.update_attributes(asset_set_params)
            @asset_set.asset_set_items.delete_all
            params[:asset_set_times].each do |i|
                AssetSetItem.new(:asset_set_id => @asset_set.id,
                                 :asset_id => i['asset_id']).save
            end

            render json: @asset_set
        else
            render json: {errors: @asset_set.errors.full_messages}, status: :bad_request
        end
    end

    def new
      @asset_set = AssetSet.new(:user_id => current_user.id)
      if @asset_set.save
        render json: @sset_set
      else
        render json: {errors: @asset_set.errors.full_messages,}, status: :bad_request
      end
    end

    private
    def asset_set_params
        params.require(:asset_set).permit(:name)
    end
end
